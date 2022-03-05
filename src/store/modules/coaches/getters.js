export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    return getters.coaches.some(coach => coach.id === rootGetters.userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if(!lastFetch)
      return true;

    const currentTimestamp = new Date().getTime();
    return currentTimestamp - lastFetch > 60 * 1000;
  },
}
