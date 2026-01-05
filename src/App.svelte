<script lang="ts">
  // import Pathways from "./models/Pathways";
  import Pathway from "./models/Pathway";

  let blockSize = $state(0);
  let inlineSize = $state(0);

  // top left to bottom right
  const pathString = $derived.by(() => {
    return `M0 0 L${inlineSize} ${blockSize}`;
  });

  const startPath = new Pathway("start-path", 0, 0, 100, 500);
  const nextPath = Pathway.getReflectionPath(startPath);
</script>

<svelte:window bind:innerHeight={blockSize} bind:innerWidth={inlineSize} />

<main class="main">
  <figure style="offset-path: path('{pathString}')">
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rectangle moving along a fixed path"
    >
      <rect width="100" height="100" />
    </svg>
  </figure>

  <svg
    width="1000"
    height="1000"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    fill="#FF0000"
  >
    {@html startPath.getAsSVGElement()}
    {@html nextPath.getAsSVGElement()}
  </svg>
</main>

<style global>
  @scope (.main) {
    @keyframes animation {
      from {
        offset-distance: 0%;
      }
      to {
        offset-distance: 100%;
      }
    }

    :scope {
      position: relative;
      block-size: 100dvh;
      inline-size: 100dvw;
      overflow: clip;
      background: oklch(0% 0 0);
    }

    figure {
      position: absolute;
      margin: 0;
      /* aspect-ratio: 1; */
      fill: oklch(67.463% 0.14145 261.353);
      offset-rotate: 0deg;
      animation: animation 2.5s infinite linear alternate;
      /* offset-anchor: center; */
      /* offset-distance: 50%; */
    }

    svg {
      display: block;
    }
  }
</style>
