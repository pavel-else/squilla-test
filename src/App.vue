<template>
  <div id="app">
    <header class="app-header">
      <router-link :to="{ name: 'Home' }">
        <div class="app-header__logo">
            <img class="app-header__logo-img" src="https://id.squilla.io/assets/img/logo.png" alt="squilla.loans">
            <div class="app-header__logo-text"><span>test</span></div>
        </div>
      </router-link>

      <div class="app-header__sign-block">
        <router-link class="app-header__sign" v-if="!isAuth" :to="{ name: 'Login' }">Login</router-link>
        <span class="app-header__sign" v-else @click="logout">Logout</span>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      console.log('logout')
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  a {
    text-decoration: none;
  }
}

.app-header {
  width: 100%;
  height: 70px;
  margin: 0 0 30px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #339fa6;

  &__logo {
    display: flex;
    align-items: flex-start;
  }

  &__logo-text {
    padding: 3px;
    border: 1px solid #ff8c51;
    display: flex;
    border-radius: 2px;

    span {
      padding: 4px 5px 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      text-transform: uppercase;
      color: #FFFFFF;
      font-size: 8px;
      line-height: 1;
      font-weight: bold;
      background: #ff8c51;

    }
  }

  &__logo-img {
    width: 160px;
    height: auto;
    margin: 0 12px 0 0;
  }

  &__sign {
    display: block;
    color: rgba(255, 255, 255, .8);

    &:hover {
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
}
</style>
