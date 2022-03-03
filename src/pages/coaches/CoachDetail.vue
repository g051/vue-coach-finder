<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view />
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area" />
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  name: 'CoachDetail',
  props: ['id'],
  data() {
    return { coach: null };
  },
  computed: {
    fullName() { return this.coach.firstName + ' ' + this.coach.lastName; },
    areas() { return this.coach.areas; },
    rate() { return this.coach.hourlyRate; },
    description() { return this.coach.description; },
    contactLink() { return this.$route.path + '/contact'; },
  },
  created() {
    this.coach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id);
  },
};
</script>

<style scoped>

</style>
