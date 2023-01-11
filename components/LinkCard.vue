<template>
  <div class="flex mx-1 m-4 w-auto" @click="openListing()">
    <div
      class="card flex p-1 rounded border border-border-color"
      style="max-width: 40rem">
      <div class="flex">
        <div class="flex flex-1 pr-1">
          <img src="https://picsum.photos/1080/1900" alt="car-image" />
        </div>
        <div class="flex flex-1 pl-1">
          <div class="card-body p-2">
            <h5 class="text-2xl text-center">{{ title }}</h5>
            <p id="description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              aut architecto iusto quod facilis eum hic, sed quidem, vero
              mollitia, deserunt nam. Qui sed eligendi tenetur et dolor vero
              consequuntur?
            </p>
            <p id="price">Price</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const title = ref("Card Title");
function openListing() {
  useRouter().push("/search/results/" + title.value.replaceAll(" ", "-"));
}
</script>
<style lang="scss" scoped>
.card {
  background-color: $primery-lighter-color;
  border-color: $border-color;
  color: white;
  height: 220px;
  min-width: 300px;
  p {
    margin: 0;
  }
  div {
    height: 100%;
  }
  img {
    // min-width: 195px;
    width: 100%;
    height: 100%;
    border-radius: $card-border-radius;
  }
  #price {
    text-align: left;
    margin-top: 0.25em;
    font-weight: bold;
    font-size: 20px;
    color: maroon;
  }
  #description {
    text-align: left;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid $border-color;
    border-radius: $card-border-radius;
    // min-width: 168px;
  }
}

@media (max-width: 422px) {
  .card-body {
    margin: 0;
    padding-block: 1.5em;
    & > * {
      & > * {
        margin: 0.2em;
        padding: 0;
      }
    }
    #description {
      -webkit-line-clamp: 3;
    }
  }
}

@media (max-width: 330px) {
  .card-body {
    margin: 0;
    padding-block: 0.5em;
    & > * {
      & > * {
        margin: 0.2em;
        padding: 0;
      }
    }
  }
}
</style>
