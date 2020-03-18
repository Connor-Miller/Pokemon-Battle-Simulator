<template>
<div class="wrapper">
  <h1>Your powerful team is all here!</h1>
  <h1>{{this.$root.$data.emptyMessage}}</h1>
  <div class="products">
    <div class="product" v-for="pokemon in this.$root.$data.team" :key="pokemon.id">
      <div class="info">
        <h1>{{pokemon.name}}</h1>
        <p>{{pokemon.type}}</p>
      </div>
      <div class="image">
        <img :src="'/images/pokemons/'+pokemon.image">
      </div>
      <div class="price">
        <button v-on:click="removeFromTeam(pokemon.id)" class="auto"> Remove </button>
      </div>
    </div>
  </div>

  <button v-on:click="setTeams()" class="auto"> Battle! </button>
  <button v-on:click="resetTeams()" class="auto"> Reset </button>
  <div class="wrapper">
    <div class="battleTime">
      <div class="myTeam">
        <div class="col">
          <h3>Your Team</h3>
          <div class="product" v-for="pokemon in this.myTeam" :key="pokemon.id">
            <div class="info">
              <h1>{{pokemon.name}}</h1>
              <p>{{pokemon.type}}</p>
            </div>
            <div class="image">
              <img :src="'/images/pokemons/'+pokemon.image">
            </div>
            <div class="price">
              <button v-on:click="attack(pokemon)" class="auto"> Attack </button>
            </div>
          </div>
        </div>
      </div>
      <div class="opposingTeam">
        <div class="col">
        <h3>The Opposing Team</h3>
          <div class="product" v-for="pokemon in this.opposingTeam" :key="pokemon.id">
            <div class="info opposingInfo">
              <h1>{{pokemon.name}}</h1>
              <p>{{pokemon.type}}</p>
            </div>
            <div class="image">
              <img :src="'/images/pokemons/'+pokemon.image">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="battleLog">
      <h1>{{battleLog}}</h1>
    </div>
  </div>
</div>




</template>


<script>

export default {
  name: 'Battle',
  props: {
    products: Array
  },
  data() {
    return {
      team: [],
      myTeam: [],
      opposingTeam: [],
      inBattle: false,
      battleLog: '',

    }
  },
  methods: {
    resetTeams() {
      this.myTeam = [];
      this.opposingTeam = [];
      this.inBattle = false;
      this.battleLog = '';
    },
    removeFromTeam(pokemonToRemove) {
      if ( this.$root.$data.team.length === 1) {
      this.$root.$data.emptyMessage = "Woops... You have no Pokemon in your team!"
      }
      for (var i = 0; i < this.$root.$data.team.length; i += 1) {
        if (pokemonToRemove === this.$root.$data.team[i].id) {
          this.$root.$data.team.splice(i, 1);
          break;
        }
      }
    },
    setTeams() {
      this.myTeam = this.$root.$data.team;
      if (this.inBattle) {alert('You are aleady in a battle!'); }
      else {
        for (var i = 0; i < this.myTeam.length; i += 1) {
          var randomID = Math.floor((Math.random() * this.$root.$data.products.length) + 1);
          let enemy = this.$root.$data.products[randomID];
          this.opposingTeam.push(enemy);
          this.$root.$data.emptyMessage = "";
          console.log('Added');
        }
        this.inBattle = true;
      }
    },
    attack(pokemontoAttack) {
      //Randomly choose opponent
      let value = Math.floor((Math.random() * this.opposingTeam.length));
      let opponent = this.opposingTeam[value];
      //check for pokemon.type
      var winner;
      if (pokemontoAttack.type === "Grass") {
        if (opponent.type === "Grass") {
          winner = "neither";
        }
        else if (opponent.type === "Fire") {
          winner = "opponent";
        }
        else if (opponent.type === "Water") {
          winner = "me";
        }
      }
      else if (pokemontoAttack.type === "Fire") {
        if (opponent.type === "Grass") {
          winner = "me";
        }
        else if (opponent.type === "Fire") {
          winner = "neither";
        }
        else if (opponent.type === "Water") {
          winner = "opponent";
        }
      }
      else if (pokemontoAttack.type === "Water") {
        if (opponent.type === "Grass") {
          winner = "opponent";
        }
        else if (opponent.type === "Fire") {
          winner = "me";
        }
        else if (opponent.type === "Water") {
          winner = "neither";
        }
      }
      else { winner = "neither"; }




      //Winner Conditions
      if (winner === "me") {
        this.battleLog = "Your " + pokemontoAttack.name + " used " + pokemontoAttack.attack + ". It's super effective!\n";
        this.battleLog += "The opposing " + opponent.name + " fainted.\n\n";
        this.opposingTeam.splice(value, 1);
      }
      else if (winner === "opponent") {
        this.battleLog = "The opposing " + opponent.name + " used " + opponent.attack + ". It's super effective!\n";
        this.battleLog += "Your " + pokemontoAttack.name + " fainted.\n\n";
        for (var i = 0; i < this.myTeam.length; i += 1) {
          if (pokemontoAttack === this.myTeam[i]) {
            this.myTeam.splice(i, 1);
            break;
          }
        }
      }
      else if (winner === "neither") {
        this.battleLog = "The opposing " + opponent.name + " used " + opponent.attack + " \nand ";
        this.battleLog += "your " + pokemontoAttack.name + " used " + pokemontoAttack.attack + ".\n";
        this.battleLog += "The opposing " + opponent.name + " and your " + pokemontoAttack.name + " fainted.\n\n";
        this.opposingTeam.splice(value, 1);
        for (var j = 0; j < this.myTeam.length; j += 1) {
          if (pokemontoAttack === this.myTeam[j]) {
            this.myTeam.splice(j, 1);
            break;
          }
        }
      }
      if (this.myTeam.length === 0) {
        this.$root.$data.emptyMessage = "Woops... You have no Pokemon in your team!"
        this.battleLog += "\nAll your Pokemon have fainted. \nYou lose!\n\n Go make another team and come back soon!\n";
      }
      else if (this.opposingTeam.length === 0) {
        this.battleLog += "\nYou have defeated all the opposing Pokemon. \nYou win!\n\n Go make another team and come back soon!\n";
      }
      else {
      this.battleLog += "\nChoose your next Pokemon to attack!\n";
      }
      //Remove fainted from Array
      //choose next pokemon
      //check if team.length is 0
    }

  }
}

</script>


<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.battleTime {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.battleLog {
  white-space: pre-line;
  text-align: center;
}
.myTeam, .opposingTeam {
  display: flex;
  flex-direction: column;
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
  border-radius: 3px;
  background-color: #E086B0;
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
.opposingInfo {
  background: #5DDDB5;
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
  margin-bottom: 3px;
}
.col {
  display: flex;
  flex-direction: row;
}
.auto {
  margin-left: auto;
}
</style>
