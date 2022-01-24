export const previewFile = (e) => {
    console.log(e);
    const file = e.target.files[0]
    return URL.createObjectURL(file)
}