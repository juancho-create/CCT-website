import os
import glob

# HTML to inject
html_to_inject = """

  <div class="container mb-60 mt-40 reveal">
    <!-- You Might Also Like -->
    <section class="mt-40 mb-40">
      <h2 class="section-title">You Might Also Like</h2>
      <div class="tours-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        <div class="tour-card" onclick="window.location.href='market-tour.html'">
          <div class="tour-card-img" style="height: 180px;">
            <img src="images/tours/market-tour-thumb.jpg" alt="Galería Alameda Market Tour" loading="lazy">
          </div>
          <div class="tour-card-body" style="padding: 15px;">
            <h4 style="font-size: 1.1rem; margin-bottom: 5px;">Galería Alameda Market Tour</h4>
            <div class="tour-card-price" style="font-size: 1.1rem;">From 95,000 COP</div>
            <a href="market-tour.html" class="btn btn-pink btn-sm mt-10" style="display: inline-block;">See Details</a>
          </div>
        </div>
        
        <div class="tour-card" onclick="window.location.href='cristo-rey.html'">
          <div class="tour-card-img" style="height: 180px;">
            <img src="images/tours/cristo-rey-thumb.jpg" alt="Cristo Rey Viewpoint Tour" loading="lazy">
          </div>
          <div class="tour-card-body" style="padding: 15px;">
            <h4 style="font-size: 1.1rem; margin-bottom: 5px;">Cristo Rey Viewpoint Tour</h4>
            <div class="tour-card-price" style="font-size: 1.1rem;">From 359,000 COP</div>
            <a href="cristo-rey.html" class="btn btn-pink btn-sm mt-10" style="display: inline-block;">See Details</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof / Reviews -->
    <section class="mt-40 mb-40">
      <h2 class="section-title">What Travelers Say</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
        <div class="glass-card" style="padding: 20px;">
          <div style="color: #FFD700; margin-bottom: 10px;">⭐⭐⭐⭐⭐</div>
          <p style="font-size: 0.95rem; font-style: italic; margin-bottom: 10px;">"Juan made Cali come alive for us. The street food tour was the highlight of our trip!"</p>
          <div style="font-size: 0.85rem; font-weight: 700;">— Sarah M., USA</div>
        </div>
        <div class="glass-card" style="padding: 20px;">
          <div style="color: #FFD700; margin-bottom: 10px;">⭐⭐⭐⭐⭐</div>
          <p style="font-size: 0.95rem; font-style: italic; margin-bottom: 10px;">"Incredibly knowledgeable guide. We learned so much about Colombian culture and history."</p>
          <div style="font-size: 0.85rem; font-weight: 700;">— Thomas B., Germany</div>
        </div>
        <div class="glass-card" style="padding: 20px;">
          <div style="color: #FFD700; margin-bottom: 10px;">⭐⭐⭐⭐⭐</div>
          <p style="font-size: 0.95rem; font-style: italic; margin-bottom: 10px;">"Best experience in Colombia. Juan is passionate, funny and knows everyone in the city!"</p>
          <div style="font-size: 0.85rem; font-weight: 700;">— Camille D., France</div>
        </div>
      </div>
    </section>
  </div>
"""

tour_pages = [
    'street-food.html', 'salsa-tour.html', 'market-tour.html', 
    'coffee-tasting.html', 'coffee-farm.html', 'chocotour.html', 
    'cristo-rey.html', 'hummingbirds.html', 'waterfalls.html', 
    'whale-watching.html'
]

working_dir = r"c:\Users\crxre\Downloads\CapturasCCT\CCT-website"

for page in tour_pages:
    path = os.path.join(working_dir, page)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Inject right before </main>
        if "</main>" in content and "What Travelers Say" not in content:
            new_content = content.replace("</main>", html_to_inject + "\n</main>")
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected into {page}")
        else:
            print(f"Skipped {page} (already injected or no </main> tag)")
    else:
        print(f"File not found: {page}")
