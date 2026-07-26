from fpdf import FPDF

class BlueprintPDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 15)
        self.cell(0, 10, 'Anahat One - Project Blueprint', border=False, ln=1, align='C')
        self.ln(10)

    def chapter_title(self, title):
        self.set_font('helvetica', 'B', 12)
        self.set_fill_color(200, 220, 255)
        self.cell(0, 8, title, border=False, ln=1, fill=True)
        self.ln(4)

    def chapter_body(self, text):
        self.set_font('helvetica', '', 11)
        self.multi_cell(0, 6, text)
        self.ln(10)

pdf = BlueprintPDF()
pdf.add_page()

pdf.chapter_title('1. Aim & Vision')
pdf.chapter_body(
    "The primary aim of the Anahat One website is to create a premium, cinematic digital presence "
    "that immediately communicates the scale and sophistication of the parent company. It showcases "
    "three distinct ventures (Hospitality, Trading, and Hardware) through an immersive, interactive "
    "hero system rather than a traditional static grid. The design philosophy is rooted in minimalism, "
    "high-contrast typography, and dynamic motion to create a 'wow' factor."
)

pdf.chapter_title('2. Technology Stack')
pdf.chapter_body(
    "- Backend Framework: Python (Flask)\n"
    "- Frontend Structure: HTML5 (Jinja2 Templates)\n"
    "- Styling: Custom Vanilla CSS3 (No external CSS frameworks to maintain maximum control and bespoke design)\n"
    "- Interactivity: Vanilla JavaScript (ES6+)\n"
    "- Typography: Google Fonts (Work Sans & Poppins)\n"
    "- Architecture: Monolithic Flask App serving dynamic templates and a REST API for the contact form."
)

pdf.chapter_title('3. Core Requirements & Features')
pdf.chapter_body(
    "- Cinematic Hero System: A custom-built JavaScript carousel engine that supports mouse dragging, "
    "touch swiping, and keyboard navigation.\n"
    "- Dynamic Color Themes: Individual carousel cards feature unique, vibrant gradients tailored to their "
    "specific venture (Taupe for Hospitality, Navy for Trading, Slate for Hardware).\n"
    "- Atmospheric Backgrounds: Full-screen background images that smoothly fade and slowly zoom "
    "(15-second cinematic zoom) based on the active carousel card.\n"
    "- Responsive Design: Fully optimized to fit exactly 100vh on both large desktops and smaller laptops "
    "without forced overflow scrolling.\n"
    "- Theming Engine: Built-in Light and Dark mode toggle with persistent local storage and CSS variables.\n"
    "- Interactive Navigation: Desktop navigation that perfectly centers itself, and a mobile-friendly side panel."
)

pdf.output('Anahat_One_Blueprint.pdf')
