// background.js

(function() {
    // Track the last seen YouTube "v=" parameter so we know when it changes
    let lastVideoId = null;
  
    /**
     * Get the current video ID from the URL (e.g., ?v=XXXX).
     */
    function getVideoIdFromUrl() {
      const match = location.search.match(/[?&]v=([^&]+)/);
      return match ? match[1] : null;
    }
  
    /**
     * Set or update the Media Session to enable next/previous media keys.
     * Customize this logic to do whatever "next" or "previous" means to you.
     */
    function setUpMediaSession() {
      const video = document.querySelector('video');
      if (!video) return; // No video element found—maybe we're not on a watch page
  
      // Example: put the YouTube video title in the metadata
      // (You could also gather channel name, thumbnail, etc.)
      navigator.mediaSession.metadata = new MediaMetadata({
        title: document.title || 'YouTube Video',
        artist: 'YouTube',
        album: '',
        artwork: [
          // Example thumbnail(s). For real usage, parse the <meta> tags or the <video> thumbnail
          { src: 'https://via.placeholder.com/96',   sizes: '96x96',   type: 'image/png' },
          { src: 'https://via.placeholder.com/128',  sizes: '128x128', type: 'image/png' }
        ]
      });
  
      // "Previous track" -> skip back 10s (example)
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        video.currentTime = Math.max(video.currentTime - 5, 0);
      });
  
      // "Next track" -> skip forward 10s (example)
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        video.currentTime = Math.min(video.currentTime + 5, video.duration);
      });
  
      // Optionally handle other actions like "seekto", "seekbackward", etc.
      navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        const skip = details.seekOffset || 5;
        video.currentTime = Math.max(video.currentTime - skip, 0);
      });
      navigator.mediaSession.setActionHandler('seekforward', (details) => {
        const skip = details.seekOffset || 5;
        video.currentTime = Math.min(video.currentTime + skip, video.duration);
      });
  
      // You could also handle pause/play if you want:
      // navigator.mediaSession.setActionHandler('pause', () => video.pause());
      // navigator.mediaSession.setActionHandler('play', () => video.play());
    }
  
    /**
     * Check if we need to update the media session (e.g., new video).
     * If so, do it.
     */
    function maybeUpdateMediaSession() {
      const currentVideoId = getVideoIdFromUrl();
      if (currentVideoId && currentVideoId !== lastVideoId) {
        lastVideoId = currentVideoId;
        setUpMediaSession();
      }
    }
  
    /**
     * We'll observe DOM changes to catch YouTube's dynamic navigation.
     */
    const observer = new MutationObserver(() => {
      // Whenever there's a DOM change, check if the video ID changed.
      maybeUpdateMediaSession();
  
      // Also, re-apply the media session in case YouTube overwrote it.
      // If you find that YouTube is overwriting your handlers frequently,
      // you can forcibly re-set them every time.
      setUpMediaSession();
    });
  
    // Start observing the entire document for changes in child elements.
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  
    // Run once immediately on load
    maybeUpdateMediaSession();
  })();
  