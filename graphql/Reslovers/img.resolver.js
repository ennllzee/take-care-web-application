exports.ImgResolver = {
    Img: {
        data: ({ data }) => {
            if (!data) return null;
            return data.toString('base64')
        },
    },
}