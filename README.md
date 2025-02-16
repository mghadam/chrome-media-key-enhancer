# Chrome Media Key Enhancer

Enable the rewind and forward media keys for **YouTube** (and optionally other websites) in **Google Chrome**. This extension lets you skip forward/backward by pressing your system’s media keys—even when Chrome is minimized or in the background.

## Features

- **Rewind / Forward**: Use your keyboard’s media keys (⏪ / ⏩) to skip backward or forward in a playing video.  
- **Works in Background**: No need to have Chrome in the foreground.  
- **Configurable**: Add more websites to handle their media sessions similarly.

---

## Installation (Unpacked Extension)

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/mghadam/chrome-media-key-enhancer.git
   ```
   Or [download as a ZIP](https://github.com/mghadam/chrome-media-key-enhancer/archive/refs/heads/main.zip) and extract the contents.

2. **Open Chrome Extensions page**  
   - Go to `chrome://extensions/`  
   - **Enable Developer Mode** (toggle in the top right corner).

3. **Load Unpacked**  
   - Click **Load unpacked**.  
   - Select the folder containing this repo (the folder with the `manifest.json`).

4. **Done**  
   - The extension should appear in your list of extensions.  
   - Navigate to YouTube or any supported site, start playing a video, and try your media keys!

---

## Usage

By default, this extension listens on **YouTube** pages:

- If you press the “previous track” key, it rewinds the video by **10 seconds**.
- If you press the “next track” key, it forwards the video by **10 seconds**.

Feel free to tweak this logic in **`background.js`** to do something else (e.g., skip to the next YouTube video in a playlist).

---

## Add Other Websites

1. **Edit `manifest.json`**  
   Under `"content_scripts"`, add a new `matches` pattern for the desired domain. For example:

   ```json
   {
     "content_scripts": [
       {
         "matches": [
           "*://www.youtube.com/*",
           "*://vimeo.com/*" // example: Vimeo
         ],
         "js": ["background.js"]
       }
     ]
   }
   ```

2. **Update `background.js`**  
   If you want site-specific behavior, detect the site with `window.location.hostname` (or a similar check), then adjust how you handle the media keys. For instance, you might query a different video element or skip forward 5 seconds instead of 10.
