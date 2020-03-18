<template>
<div>
  <h5>Welcome to the Pokemon Battle Simulator! <br><br> Simply create your ideal battle team then head over to the 'Battle' tab to test your wits and luck against a random opponent.</h5>
  <div class="search">
  <div class="wrapper">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>
  </div>
  <ProductList :products="products" />
</div>
</template>

<script>
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Home',
  components: {
    ProductList
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    products() {
      return this.$root.$data.products.filter(product => product.name.toLowerCase().search(this.searchText) >= 0);
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
  background-color: white;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}
h5 {
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  text-align: center;
  font-size: 36px;
  width: 100%;
  font-style: italic;

}
input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>
