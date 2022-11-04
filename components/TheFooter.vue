<template>
  <div class="container-fluid">
    <div class="footer row pt-3 px-1 pb-1 mt-4 border-top">
      <div class="col-4 d-flex flex-column align-items-start justify-content-start">
        <ul class="internal-ul">
          <li>
            <NuxtLink to="/about" class="internal-links">About</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="col-4 d-flex flex-column align-items-center justify-content-end">
        <a href="/" class="d-flex align-items-center justify-content-between"
          ><img
            class="logo-text"
            width="194"
            src="../assets/text-logo.svg"
            alt="text-logo-footer"
        /></a>
        <p class="text-center text-muted pt-3 text-nowrap">© 2022 4ip's Auto, Inc</p>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <ul class="nav justify-content-end list-unstyled d-flex flex-nowrap">
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
    transition: all 0.3s ease;
    padding-left: 0;
    list-style-type: none;
    li {
      ::before {
        vertical-align: -5%;
        content: url("../assets/gear-icon.svg");
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
@media (max-width: 500px) {
  .internal-ul {
    min-width: 120px;
  }
  .logo-text {
    width: 124px;
  }
  .external-link-icons {
    width: 20px !important;
  }
}
@media (max-width: 370px) {
  .col-4 {
    padding: 0;
  }
  li:has(.external-link-icons) {
    margin-left: 0.5em !important;
  }
}
</style>
