const { Image, UserLikedImages, User } = require("../database/models");
const { Op } = require("sequelize");

const imageController = {
    upload: upload,
    getImages: getImages,
    deleteImage: deleteImage,
    updateImageLikes: updateImageLikes,
    getLikedImages: getLikedImages
};

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({ keyFilename: './controllers/winter-sum-291420-0255688cea3a.json' });
const bucketname = 'dig-drawings'
const bucket = storage.bucket(bucketname);


async function upload(req, res, next) {
	try {
        const { originalname, buffer } = req.file;

        // add time stamp to image name to prevent duplicate names
        newName = originalname.split('.');
        newName.pop();
        newName.join('.').replace(/ /g, "_");
        newName = newName + "_" + Date.now() + ".jpg";
        const coordinates = JSON.parse(req.body.coordinates);
        const latitude = coordinates[0];
        const longitude = coordinates[1];
        const initialLikes = 0;

        const user = req.body.user
        if(!user){
            res.status(400).send("No user provided")
        }
        
        const blob = bucket.file(newName);
        const blobStream = blob.createWriteStream({resumable: false})

        // performs write to GCS
        blobStream.on('finish', () => {
            const url = `https://storage.googleapis.com/${bucketname}/${newName}`

            Image.create({
                url: url,
                name: newName,
                user: user,
                latitude: latitude,
                longitude: longitude,
                likes: initialLikes
            })

            res.status(200).send(url);
          })
          .on('error', () => {
            res.status(400).send('Unable to upload image, something went wrong')
          })
          .end(buffer)

	} catch (err) {
        res.status(400).send(err);
        next(err);
	}
}

function getRange(coordinates, distance){
    const lat_diff = distance/69
    const lat = [coordinates[0]-lat_diff, coordinates[0]+lat_diff]
    const long_diff = distance/(Math.cos(coordinates[0]*Math.PI/180)*69)
    const long = [coordinates[1]-long_diff, coordinates[1]+long_diff]
    return {latitude:lat, longitude:long}
}

async function getImages(req, res, next){
    try{
        var images = [];
        if(req.query.email){
            images = await Image.findAll({
                where: {
                    user: req.query.email
                }
            })
        }
        else{
            const distance = req.query.distance || 50
            if(!req.query.coordinates){
                images = await Image.findAll()
            }
            else{
                const coordinates = JSON.parse(req.query.coordinates)
                const range = getRange(coordinates, distance)
                images = await Image.findAll({
                    where: {
                        latitude: {
                            [Op.between]: range.latitude
                        },
                        longitude: {
                            [Op.between]: range.longitude
                        }
                    }
                })
            }         
        }

        res.status(200).json(images);
    } catch (err) {
        console.log(err)
        next(err);
    }
}

async function deleteImage(req, res, next){
    try{
        const deleted = await Image.destroy({
            where: {name: req.params.name}
        })
        if(deleted){
            await bucket.file(req.params.name).delete()
            res.status(200).send("Successfully Deleted")
        }
        else{
            res.status(400).send("There was a problem deleting this image")
        }
    } catch (err) {
        next(err)
    }
}

async function getLikedImages(req, res, next){
    try{
        const likedImages = await UserLikedImages.findAll({ attributes: ['image'], where: {user: req.query.user}});
        if (likedImages){
            res.status(200).json(likedImages);
        }else{
            res.status(200).send("No Liked Images!");
        }
    } catch (err){
        next(err);
    }
}

async function updateImageLikes(req, res, next){
    try{
        const image = await Image.findOne({ where: {name: req.body.imageName}});
        if (image){
            const alreadyLikedImage = await UserLikedImages.findOne({ where: {user: req.body.user, image: image.name}});
            if (alreadyLikedImage){
                image.likes = image.likes - 1;
                await image.save();
                await UserLikedImages.destroy({ where: {user: req.body.user, image: image.name}});
                res.status(200).send("Unliked Image!");
            }else{
                image.likes = image.likes + 1;
                await image.save();
                await UserLikedImages.create({user: req.body.user, image: image.name});
                res.status(200).send("Successfully Liked Image!");
            }
        }else{
            res.status(400).send("Image Doesn't Exist!");
        }
    } catch (err){
        next(err);
    }
}


module.exports = imageController;
