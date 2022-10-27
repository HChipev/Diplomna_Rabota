<template>
  <div class="col-lg-6 mt-4" align="center">
    <div class="card p-1" style="max-width: 40rem">
      <div class="row">
        <div class="col-6 pe-1">
          <img src="https://picsum.photos/1080/1900" alt="car-image" />
        </div>
        <div class="col-6 ps-1">
          <div class="card-body p-2">
            <h5 class="card-title">Card title</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <p id="description">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aut
                  architecto iusto quod facilis eum hic, sed quidem, vero mollitia,
                  deserunt nam. Qui sed eligendi tenetur et dolor vero consequuntur?
                </p>
              </li>
              <li class="list-group-item"><p id="price">Price</p></li>
            </ul>
            <p class="text-muted">08/2005, Petrol<br />Sofia</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.ps-1 {
  padding-left: 0.15em !important;
}
.pe-1 {
  padding-right: 0.15em !important;
}
.card {
  background-color: $primery-lighter-color;
  border-color: $border-color;
  color: white;
  height: 220px;
  p {
    margin: 0;
  }
  div {
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: $card-border-radius;
  }
  .text-muted {
    font-size: 12px;
    color: $text-muted-color !important;
    text-align: start;
  }
  #price {
    margin-top: 0.25em;
    font-weight: bold;
    font-size: 20px;
    color: maroon;
  }
  #description {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
  .list-group-item {
    text-align: start;
    background: none;
    padding: 0;
    color: white;
  }

  .card-body {
    border: 1px solid $border-color;
    border-radius: $card-border-radius;
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
