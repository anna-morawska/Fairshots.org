import { CLOUDINARY_API, FAIRSHOTS_API } from "./constants";

export function uploadPhoto(userType, id, token, url) {
    return async dispatch => {
        try {
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${token}`
                },
                body: JSON.stringify({ photos: [{ [`${userType}Id`]: id, cloudlink: url }] })

            };
            console.log(config);
            const res = await fetch(`${FAIRSHOTS_API}api/${userType}/${id}/photos`, config);
            const ret = await res.json();
            console.log(ret);
            dispatch(
                {
                    type: "PHOTO_UPLOADED",
                    payload: ret
                }
            );
        } catch (e) {
            console.log(e);
            dispatch(
                {
                    type: "UPLOAD_ERROR",
                    payload: "Oops! Something went wrong. Plase try again"
                }
            );
        }
    };
}

export async function sendPhotoGetUrl(file, upreset = "kahvrgme") {
    try {
        const fd = new FormData(); // need to improve this
        fd.append("file", file);
        fd.append("upload_preset", upreset);
        const imgUp = await fetch(`${CLOUDINARY_API}/upload`, {
            method: "POST",
            body: fd
        });
        const imgRes = await imgUp.json();
        console.log(imgRes);
        return imgRes;
    } catch (e) {
        throw e;
    }
}

export async function delPhoto(userType, id, token, photoItem) {
    try {
        const fd = new FormData(); // need to improve this
        fd.append("public_id", photoItem.match(/w+.jpg/g));
        const imgUp = await fetch(`${CLOUDINARY_API}/upload`, {
            method: "POST",
            body: fd
        });
        const imgRes = await imgUp.json();
        console.log(imgRes);
        return imgRes;
    } catch (e) {
        throw e;
    }
}
