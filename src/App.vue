<template>
  <div id="app">
    <header class="app-header">
      <div class="app-header__logo">
        <div class="app-header__logo-text"><span>test</span></div>
        <img class="app-header__logo-img" src="https://id.squilla.io/assets/img/logo.png" alt="squilla.loans">
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-header {
  height: 70px;
  margin: 0 0 30px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  background: #339fa6;

  &__logo {
    width: 190px;
    display: flex;
    flex-direction: column;
  }

  &__logo-text {
    align-self: flex-end;
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
    width: 150px;
    height: auto;
  }
}
</style>
