export default {

  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    }

    const res = await fetch(`https://vue-coach-1b625-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });
    const resData = await res.json();
    console.log('[contactCoach]', res, resData);
    if(!res.ok)
      throw new Error(resData.message || 'Failed to send request.')

    newRequest.id = resData.name;
    newRequest.coachId = payload.coachId;
    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const res = await fetch(`https://vue-coach-1b625-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`);
    const resData = await res.json();
    console.log('[fetchRequests]', res, resData);
    if(!res.ok)
      throw new Error(resData.message || 'Failed to fetch requests.')

    const requests = [];
    for(const id in resData)
      requests.push({id, coachId, ...resData[id]});

    context.commit('setRequests', requests);
  }
}
