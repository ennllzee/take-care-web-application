const path = require("path");
const fs = require('fs');
const { finished } = require('stream/promises');

const Customer = require('../../../models/customer.model')
const Guide = require('../../../models/guide.model')
const Admin = require('../../../models/admin.model')

const CustomerProfileImg = require('../../../models/customerprofileimg.model')
const GuideProfileImg = require('../../../models/guideprofileimg.model')
const GuideFile = require('../../../models/guidefileupload.model')
const AdminFile = require('../../../models/adminfileupload.model')


exports.UploadfileMutation = {
    Mutation: {
        addCustomerProfile: async (_, { customerId, file }) => {
            const { createReadStream, filename, mimetype } = await file;
            const location = path.join(__dirname, `../../../public/uploads/${filename}`)

            const stream = createReadStream();
            const out = fs.createWriteStream(location);
            await stream.pipe(out);
            await finished(out);

            const Img = new CustomerProfileImg({
                filename,
                mimetype,
                data: fs.readFileSync(location)
            });

            try {
                await Img.save();
                fs.unlinkSync(location)

                const getCustomerdata = await Customer.findById(customerId);
                if (getCustomerdata.Avatar) await CustomerProfileImg.findByIdAndDelete(getCustomerdata.Avatar)

                const existuser = await Customer.findByIdAndUpdate(customerId, { Avatar: Img }, { new: true });
                if (!existuser) throw new Error('NOT FOUND USER')
                return true
            } catch (error) {
                return false
            }

        },
        addGuideProfile: async (_, { guideId, file }) => {
            const { createReadStream, filename, mimetype } = await file;
            const location = path.join(__dirname, `../../../public/uploads/${filename}`)

            const stream = createReadStream();
            const out = fs.createWriteStream(location);
            await stream.pipe(out);
            await finished(out);

            const Img = new GuideProfileImg({
                filename,
                mimetype,
                data: fs.readFileSync(location)
            });

            try {
                await Img.save();
                fs.unlinkSync(location)

                const getGuidedata = await Guide.findById(guideId);
                if(getGuidedata.Avatar) await GuideProfileImg.findByIdAndDelete(getGuidedata.Avatar)

                const existuser = await Guide.findByIdAndUpdate(guideId, { Avatar: Img }, { new: true });
                if (!existuser) throw new Error('NOT FOUND USER')
                return true
            } catch (error) {
                return false
            }
        },
        uploadCertificateGuide: async (_, { guideId, file }) => {
            const { createReadStream, filename, mimetype } = await file;
            const location = path.join(__dirname, `../../../public/uploads/${filename}`)

            const stream = createReadStream();
            const out = fs.createWriteStream(location);
            await stream.pipe(out);
            await finished(out);

            const Img = new GuideFile({
                filename,
                mimetype,
                data: fs.readFileSync(location)
            });

            try {
                await Img.save();
                const existuser = await Guide.findById(guideId)
                if (!existuser) throw new Error('NOT FOUND USER')

                if (existuser.Education.Certificate) {
                    await GuideFile.findByIdAndDelete(existuser.Education.Certificate)
                }

                await Guide.findByIdAndUpdate(guideId, { Education: { ...existuser.Education, Certificate: Img } }, { new: true });
                fs.unlinkSync(location);
                return true
            } catch (error) {
                return false
            }
        },
        uploadFaceWithIdcardGuide: async (_, { guideId, file }) => {
            const { createReadStream, filename, mimetype } = await file;
            const location = path.join(__dirname, `../../../public/uploads/${filename}`)

            const stream = createReadStream();
            const out = fs.createWriteStream(location);
            await stream.pipe(out);
            await finished(out);

            const Img = new GuideFile({
                filename,
                mimetype,
                data: fs.readFileSync(location)
            });

            try {
                await Img.save();
                const existuser = await Guide.findById(guideId)
                if (!existuser) throw new Error('NOT FOUND USER')

                const getGuidedata = await Guide.findById(guideId);
                await GuideFile.findByIdAndDelete(getGuidedata.FaceWithIdCard)

                await Guide.findByIdAndUpdate(guideId, { FaceWithIdCard: Img }, { new: true });
                fs.unlinkSync(location);
                return true
            } catch (error) {
                return false
            }
        },
        uploadfilesAdmin: async (_, { adminId, file }) => {
            const { createReadStream, filename, mimetype } = await file;
            const location = path.join(__dirname, `../../../public/uploads/${filename}`)

            const stream = createReadStream();
            const out = fs.createWriteStream(location);
            await stream.pipe(out);
            await finished(out);

            const Img = new AdminFile({
                filename,
                mimetype,
                data: fs.readFileSync(location)
            });

            try {
                await Img.save();
                fs.unlinkSync(location)
                const existuser = await Admiin.findByIdAndUpdate(adminId, { Avatar: Img }, { new: true });
                if (!existuser) throw new Error('NOT FOUND USER')
                return true
            } catch (error) {
                return false
            }
        },
    }
}