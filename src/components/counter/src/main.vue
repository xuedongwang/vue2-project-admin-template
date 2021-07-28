<template>
  <div>
    <span class="num">{{ count }}</span>
    <button class="add-btn" @click="add">add</button>
    <button class="minus-btn" @click="minus">minus</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      count: 0
    };
  },

  methods: {
    add () {
      this.count++;
    },
    minus () {
      this.count--;
    }
  }
};
</script>
