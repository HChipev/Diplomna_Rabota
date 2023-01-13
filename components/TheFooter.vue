<template>
  <div class="w-screen min-w-min">
    <div class="footer flex pt-3 px-2 py-1 mt-4 border-t">
      <div
        class="flex flex-1 flex-col items-start justify-start px-2 min-h-full">
        <ul class="internal-ul whitespace-nowrap">
          <li>
            <NuxtLink to="/about" class="internal-links">About</NuxtLink>
          </li>
        </ul>
      </div>
      <div
        class="flex flex-1 flex-col items-center justify-end px-2 min-h-full">
        <a href="/" class="flex items-center justify-between"
          ><img
            class="logo-text w-48"
            src="../assets/text-logo.svg"
            alt="text-logo-footer"
        /></a>
        <p
          class="copyright text-center whitespace-nowrap text-text-muted-color pt-3">
          © {{ new Date().getFullYear() }} 4ip's Auto, Inc
        </p>
      </div>
      <div class="flex flex-1 justify-end pl-2 pr-2 lg:pr-5 min-h-full">
        <ul class="nav justify-end list-unstyled flex flex-nowrap">
          <li class="ml-3">
            <a
              class="items-center justify-center"
              href="https://instagram.com/_hchipev_/"
              target="_blank"
              ><img
                class="external-link-icons w-7"
                src="../assets/instagram-icon.svg"
                alt="instagram-logo"
            /></a>
          </li>
          <li class="ml-3">
            <a
              class="items-center justify-center"
              href="https://www.linkedin.com/in/hristo-chipev-122217208/"
              target="_blank"
              ><img
                class="external-link-icons w-7"
                src="../assets/linkedin-icon.svg"
                alt="linkedIn-logo"
            /></a>
          </li>
          <li class="ml-3">
            <a
              class="items-center justify-center"
              href="https://github.com/HChipev"
              target="_blank"
              ><img
                class="external-link-icons w-7"
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
    min-width: 260px;
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
      min-width: 18px;
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
      transition: all 0.3s ease;
      &:hover {
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
      }
    }
  }
  @media screen and (max-width: 380px) {
    .logo-text {
      width: 128px !important;
    }
    .copyright {
      font-size: 0.75rem !important;
    }
  }
</style>
