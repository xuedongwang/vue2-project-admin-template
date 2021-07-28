<template>
  <div class="home">
    home
    <counter/>
  </div>
</template>

<script>
import counter from '@/components/counter';
export default {
  components: {
    counter
  },
  data () {
    return {
      name: '3231'
    };
  },
  title () {
    return this.name;
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
}
</style>