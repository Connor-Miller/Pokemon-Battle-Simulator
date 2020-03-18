<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="pokemon in products" :key="pokemon.id">
      <div class="info">
        <h1>{{pokemon.name}}</h1>
        <p>{{pokemon.type}}</p>
      </div>
      <div class="image">
        <img :src="'/images/pokemons/'+pokemon.image">
      </div>
      <div class="price">
        <button v-on:click="addToTeam(pokemon)" class="auto">Add to Team</button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'ProductList',
  props: {
    products: Array
  },
  data() {
    return {
      team: [],
    }
  },
  methods: {
    addToTeam(product) {
      this.$root.$data.team.push(product);
      this.$root.$data.emptyMessage = "";
      console.log('Added');
    }
  }
}

</script>




<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
  background-color: #E086B0
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #9BBDF9;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}


.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
  border-radius: 5px;
}

.auto {
  margin-left: auto;
}
</style>
