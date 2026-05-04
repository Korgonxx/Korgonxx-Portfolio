# Portfolio Upgrade Plan — Creative Skills Integration

## Vision
Elevate the existing portfolio with WebGL/3D backgrounds, sophisticated typography, and premium design patterns while keeping the current UX intact.

## Phases

### Phase 1: p5.js WebGL Background (Hero)
- Add a subtle 3D particle network or flowing mesh as dynamic background behind the hero name
- Interactive: responds to mouse movement
- Maintains contrast with existing text

### Phase 2: Pretext Typography Enhancements
- Kinetic typography for section headers (letter-spacing animations)
- DOM-free text effects for taglines/chip labels
- Text-as-geometry effects for the hero name ghost

### Phase 3: Popular Web Designs Patterns
- Adopt Stripe-style card hover states (depth, shadow, border-radius)
- Linear-style smooth color transitions on skill bars
- Vercel gradient accents on call-to-action buttons

### Phase 4: ComfyUI Background Art (Optional)
- Generate abstract geometric textures for section dividers
- Create subtle noise overlay for visual texture

### Phase 5: Manim Video Integration (Optional)
- Embed short animated explainer for "What I Do" section
- Auto-play muted loop

## Implementation Notes
- All skills are preloaded; no package installs required
- Work in `~/projects/webgl-creative-frontend/portfolio/`
- Commit after each phase for easy rollback
- Keep dark mode as default; ensure light mode compatibility
