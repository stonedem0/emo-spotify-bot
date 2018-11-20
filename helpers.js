const asyncForEach = async(array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

const getTracks = tracks =>
  tracks
    .map(t => t.track.external_urls.spotify)
    .filter(t => t != null)


const random = (arr, l) => {
    let num = Math.floor((Math.random() * arr.length) + 0);
    return arr[num]
}

module.exports = {
    getTracks,
    random
}