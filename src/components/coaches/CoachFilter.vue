<template>
  <BaseCard>
    <h2>Find Your Coach</h2>
    <span v-for="(value, key) in filters" :key="key" class="filter-option">
      <input type="checkbox" :id="key" :checked="value" @change="onChange" />
      <label :for="key">{{ key }}</label>
    </span>
  </BaseCard>
</template>

<script>
export default {
  name: 'CoachFilter',
  props: ['filters', 'onChange']
  // emits: ['change-filter'],
  // data() {
  //   return {
  //     filters: {
  //       frontend: true,
  //       backend: true,
  //       career: true
  //     }
  //   }
  // },
  // methods: {
  //   setFilter(event) {
  //     const {id, checked} = event.target;
  //     this.filters = {
  //       ...this.filters,
  //       [id]: checked
  //     }
  //     this.$emit('change-filter', this.filters);
  //   }
  // }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
