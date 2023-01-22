import { updateSpaceRating } from "../spaces/api";
import api from "../_common/api";
const { createDoc, createAnonDoc, getDocsSub, updateField, getDocsByFieldSub, getDocsByFields } = api("reviews");


const setIsApproved = async (id, isApproved, spaceId) => {
  await updateField(id, { isApproved });
  const rating = await getRating(spaceId);
  return await updateSpaceRating(spaceId, rating);
}


function getAvg(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return total / grades.length;
}
//TODO: write criteria into firebase query
const getRatingSub = (id, callback) => {
  return getDocsByFieldSub("spaceId", id, docs => {
    const rating = getAvg(docs.filter(d => d.isApproved).map(d => d.rating));
    callback(rating);
  });
  //get approved reviews
  //average ratings

}

const getRating = async (spaceId) => {
  const docs = await getDocsByFields([{ field: "spaceId", value: spaceId }, { field: "isApproved", value: true }]);
  if (!docs || docs.length < 1) return -1
  const rating = getAvg(docs.map(d => d.data().rating));
  return rating;
}

export { createDoc, createAnonDoc, getDocsSub, setIsApproved, getRatingSub, getRating };

