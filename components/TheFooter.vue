<template>
  <div class="container">
    <div
      class="footer d-flex flex-wrap justify-content-between align-items-center pt-3 px-1 mt-4 border-top"
    >
      <a
        href="/"
        class="col-md-6 d-flex align-items-center justify-content-between mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        ><img width="124" src="../assets/text-logo.svg" alt="text-logo-footer"
      /></a>
      <ul class="nav col-md-6 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a class="text-muted" href="https://instagram.com/_hchipev_/" target="_blank"
            ><img
              class="external-link-icons"
              src="../assets/instagram-icon.svg"
              alt="instagram-logo"
          /></a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="https://github.com/HChipev" target="_blank"
            ><img
              class="external-link-icons"
              src="../assets/github-icon.svg"
              alt="github-logo"
          /></a>
        </li>
      </ul>
    </div>
    <p class="text-center text-muted">© 2022 4ip's Auto, Inc</p>
  </div>
</template>
<script setup></script>
<style lang="scss">
.footer {
  border-color: $border-color !important;
  .external-link-icons {
    width: 24px;
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
    transition: all 0.3s ease;
    &:hover {
      -webkit-filter: grayscale(0);
      filter: grayscale(0);
    }
  }
}
</style>
