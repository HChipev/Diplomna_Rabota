<template>
  <div class="container-fluid">
    <div class="footer row pt-3 px-1 pb-1 mt-4 border-top">
      <div class="col-4">
        <ul class="internal-ul">
          <li>
            <NuxtLink to="/about" class="internal-links">About</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="col-4 d-flex flex-column align-items-center justify-content-center">
        <a href="/" class="d-flex align-items-center justify-content-between"
          ><img width="194" src="../assets/text-logo.svg" alt="text-logo-footer"
        /></a>
        <p class="text-center text-muted pt-5">© 2022 4ip's Auto, Inc</p>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <ul class="nav justify-content-end list-unstyled d-flex">
          <li class="ms-3">
            <a
              class="align-items-center justify-content-center"
              href="https://instagram.com/_hchipev_/"
              target="_blank"
              ><img
                class="external-link-icons"
                src="../assets/instagram-icon.svg"
                alt="instagram-logo"
            /></a>
          </li>
          <li class="ms-3">
            <a
              class="align-items-center justify-content-center"
              href="https://www.linkedin.com/in/hristo-chipev-122217208/"
              target="_blank"
              ><img
                class="external-link-icons"
                src="../assets/linkedin-icon.svg"
                alt="linkedIn-logo"
            /></a>
          </li>
          <li class="ms-3">
            <a
              class="align-items-center justify-content-center"
              href="https://github.com/HChipev"
              target="_blank"
              ><img
                class="external-link-icons"
                src="../assets/github-icon.svg"
                alt="github-logo"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss">
.footer {
  border-color: $accent-color !important;
  background: $black;
  .internal-ul {
    padding-left: 0;
    list-style-type: none;
    li {
      ::before {
        content: "⚙️";
        padding-right: 0.25em;
      }

      .internal-links {
        color: $text-muted-color;
        text-decoration: none;
        &:hover {
          color: $accent-color;
        }
      }
    }
  }
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
