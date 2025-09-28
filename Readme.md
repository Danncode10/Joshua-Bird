# **App Master Plan — Single-Button Flappy Bird Game**

## **Phase 0 — Project Setup**

**Goal:** Prepare the project structure and dependencies.

1. Clone the starter repo:

   ```bash
   git clone https://github.com/Danncode10/ui-starter-expo-sdk-latest.git UI
   cd UI
   ```
2. Install Expo dependencies:

   ```bash
   npm install
   ```
3. Ensure Expo works:

   ```bash
   expo start
   ```
4. Folder structure:

   ```
   /UI
     /assets
       /images
       /audio
     /components
     /screens
     /documentation
   ```
5. Style all components with `StyleSheet`.
6. Configure `.gitignore` (node_modules, expo, build, etc.)

---

## **Phase 1 — Core Game Screen**

**Goal:** Display the character and background.

* Create `GameScreen.tsx` in `/screens`.
* Render the PNG face at starting coordinates.
* Simple background (solid color or simple image).
* Prepare assets: PNG face + pipe images.

---

## **Phase 2 — One-Button Controls**

**Goal:** Implement tap vs long-press interactions.

* Use `Pressable` with `onPress` and `onLongPress`.
* Map gestures to face movement:

  * **Tap:** bounce upward
  * **Long-press:** dash forward
* Include audio triggers for each action.
* Use Expo-AV or React Native Sound for audio playback.

**Current Implementation:**
* A circular Pressable button (120x120, blue semi-transparent background with shadows) is positioned at the bottom center of the screen.
* The face PNG (joshua_face.png) starts at position (50, screenHeight - 250) and responds to interactions.
* **Tap:** Applies upward velocity (-10) for a physics-based bounce and plays bounce.mp3 sound.
* **Long-press (100ms delay):** Starts continuous rightward dashing (2 pixels per frame using requestAnimationFrame) while applying reduced gravity (1/3 original speed for slope-like movement), loops dash.mp3 sound until release.
* **Release:** Stops the dash and reduced gravity, stops sound.
* Handlers use React hooks (useRef for all states including long-press, positions, velocities, animation frame, and sounds) for management. Audio is loaded via Expo-AV on mount and unloaded on unmount. Physics loop uses requestAnimationFrame with gravity (0.5 base, 0.1/3 during long press), velocity updates, and boundary checks.

---

## **Phase 3 — Physics & Movement**

**Goal:** Add gravity, velocity, and screen boundaries.

* Implement gravity: gradually pull face downward.
* Update vertical and horizontal positions per frame (`requestAnimationFrame` or `setInterval`).
* Prevent the face from leaving the screen vertically.
* Optional: smooth animations with Reanimated.

---

## **Phase 4 — Obstacles**

**Goal:** Add infinite scrolling pipes.

* Generate pipes at intervals with random vertical gaps.
* Move pipes left to simulate scrolling.
* Remove pipes that go off-screen.
* Ensure pipe collision zones are detectable.

---

## **Phase 5 — Collision Detection**

**Goal:** Detect collisions and trigger game-over.

* Check intersection between face and pipes each frame.
* On collision:

  * Play “ouch” audio
  * Set game state to “Game Over”
* Ensure tap/dash inputs are disabled after collision until restart.

---

## **Phase 6 — Game Over & Restart**

**Goal:** Allow restart without reloading the app.

* Overlay a simple “Game Over” modal or message.
* Include a restart button to reset:

  * Face position
  * Pipe positions
  * Velocities and timers
* Optional: display a score based on distance traveled or pipes passed.

---

## **Phase 7 — Audio & Asset Integration**

**Goal:** Integrate all custom assets.

* Import all PNGs and audio clips into `/assets`.
* Assign sounds to each action (tap, long-press, collision).
* Ensure volume, timing, and playback are smooth.

---

## **Phase 8 — UI Polish & Minor Animations**

**Goal:** Make the game visually appealing and responsive.

* Add subtle face rotation or squash/stretch when bouncing/dashing.
* Smooth pipe movement.
* Background can have parallax effect (optional).
* Button visual feedback on tap/long-press.

---

## **Phase 9 — Testing & Optimization**

**Goal:** Ensure smooth gameplay on devices.

* Test on Expo Go (iOS and Android if possible).
* Adjust physics constants (gravity, bounce, dash speed).
* Optimize performance: remove off-screen pipes, limit active timers.
* Verify audio sync and responsiveness of tap vs long-press.

---

## **Phase 10 — Documentation & Final Steps**

**Goal:** Document the project and prepare for sharing.

* Fill `/documentation` folder:

  * README.md with setup instructions
  * Assets list and licenses
  * Brief description of game mechanics and controls
* Final commit & push to GitHub.

---

### **Optional Future Phases**

* Add **scoring system** (distance or pipes passed).
* Leaderboards using Firebase Firestore.
* Power-ups or multiple characters.
* Minor UI/UX improvements (tutorial screen, pause button).
