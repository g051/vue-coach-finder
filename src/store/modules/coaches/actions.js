export default {

  async registerCoach(context, data) {
    const id = context.rootGetters.userId;
    const coach = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const res = await fetch(`https://vue-coach-1b625-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(coach)
    });
    console.log('[registerCoach]', res);
    // TODO: error handling
    if(!res.ok) {
      console.error('[registerCoach]', res);
    }
    // const resData = await res.json();

    context.commit('addCoach', {...coach, id});
  },

  async loadCoaches(context, payload) {
    if(!payload.forceRefresh && !context.getters.shouldUpdate)
      return;

    const res = await fetch(`https://vue-coach-1b625-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`);
    const resData = await res.json();
    console.log('[loadCoaches]', res, resData);
    if(!res.ok)
      throw new Error(resData.message || 'Failed to fetch!');

    const coaches = [];
    for(const id in resData)
      coaches.push({ id, ...resData[id] });

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
