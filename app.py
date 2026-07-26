import os
import secrets
from flask import Flask, render_template, request, jsonify, abort, session
from werkzeug.utils import secure_filename

app = Flask(__name__)
# Generate a secret key for session management and CSRF
app.secret_key = os.environ.get("SECRET_KEY", secrets.token_hex(32))

# --- Security: CSRF Protection ---
def generate_csrf_token():
    if '_csrf_token' not in session:
        session['_csrf_token'] = secrets.token_hex(16)
    return session['_csrf_token']

app.jinja_env.globals['csrf_token'] = generate_csrf_token

@app.before_request
def csrf_protect():
    if request.method == "POST":
        token = session.get('_csrf_token', None)
        # Check header or form data for token
        header_token = request.headers.get('X-CSRFToken')
        form_token = request.form.get('csrf_token')
        
        if not token or token not in (header_token, form_token):
            return jsonify({"status": "error", "message": "CSRF token missing or invalid."}), 403

# --- Error Handlers ---
@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html', error_code="404", error_title="Page Not Found", error_message="The page you are looking for does not exist or has been moved."), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('error.html', error_code="500", error_title="Internal Error", error_message="Our servers encountered an unexpected issue. Please try again later."), 500


@app.route('/')
def home():
    return render_template('index.html')

# --- Central Venture Configuration ---
VENTURES_DB = {
    "stays": {
        "title": "Stays",
        "category": "Hospitality",
        "hero_image": "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80&w=2000",
        "description": "Curated luxury architecture and premium hospitality experiences designed to elevate your lifestyle.",
        "overview": "Anahat Stays redefines the intersection of design, comfort, and service. We acquire and develop properties in the world's most desirable locations, transforming them into architectural masterpieces that offer an unparalleled living experience. Every detail, from the ambient lighting to the custom furnishings, is meticulously planned.",
        "highlights": [
            "Exclusive access to off-market luxury properties.",
            "Bespoke architectural design and interior styling.",
            "24/7 dedicated concierge and lifestyle management."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
        ],
        "future_vision": "Expanding our portfolio into private island retreats and hyper-exclusive urban sanctuaries across Europe and Asia by 2028.",
        "website": "https://example.com/stays",
        "departments": [
            "Operations",
            "Marketing",
            "Business Development",
            "Architecture & Design"
        ]
    },
    "trading": {
        "title": "Trading",
        "category": "Financial",
        "hero_image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2000",
        "description": "Advanced algorithmic environments and institutional-grade financial market infrastructure.",
        "overview": "Anahat Trading leverages cutting-edge technology and quantitative analysis to navigate global financial markets. Our proprietary algorithmic systems process millions of data points in real-time, executing strategies with microsecond precision. We build the infrastructure that powers the future of finance.",
        "highlights": [
            "Proprietary high-frequency trading algorithms.",
            "Institutional-grade risk management protocols.",
            "Direct market access to global exchanges."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200"
        ],
        "future_vision": "Developing decentralized finance (DeFi) bridges and quantum-resistant cryptographic protocols for the next generation of asset exchange.",
        "website": "https://example.com/trading",
        "departments": [
            "Software Engineering",
            "Quantitative Research",
            "Data Science",
            "Infrastructure"
        ]
    },
    "hardware": {
        "title": "Hardware",
        "category": "Technology",
        "hero_image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
        "description": "Precision robotics, intelligent manufacturing, and next-generation physical engineering.",
        "overview": "Anahat Hardware builds the physical foundation of the future. From precision robotics that augment human capability to sustainable manufacturing processes, we engineer solutions that solve complex physical problems. Our products are characterized by industrial elegance and uncompromising performance.",
        "highlights": [
            "Advanced robotics and automation engineering.",
            "Sustainable and highly efficient manufacturing processes.",
            "Premium industrial design focused on ergonomics and durability."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
        ],
        "future_vision": "Pioneering new materials science applications and integrating advanced AI directly into consumer hardware devices.",
        "website": "https://example.com/hardware",
        "departments": [
            "Embedded Systems",
            "Firmware",
            "Electronics",
            "Industrial Design"
        ]
    }
}

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/services/<venture_id>')
def venture_detail(venture_id):
    venture = VENTURES_DB.get(venture_id.lower())
    if not venture:
        abort(404)
    return render_template('venture_detail.html', venture=venture)


@app.route('/careers')
def careers():
    # Pass VENTURES_DB to the template to populate dropdowns dynamically
    return render_template('careers.html', ventures=VENTURES_DB)

ALLOWED_EXTENSIONS = {'pdf'}
MAX_FILE_SIZE = 10 * 1024 * 1024 # 10MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/apply', methods=['POST'])
def apply_career():
    # Security: Validate file uploads
    if 'resume' not in request.files:
        return jsonify({"status": "error", "message": "No resume uploaded."}), 400
        
    file = request.files['resume']
    if file.filename == '':
        return jsonify({"status": "error", "message": "No file selected."}), 400
        
    if not allowed_file(file.filename):
        return jsonify({"status": "error", "message": "Invalid file type. Only PDF is allowed."}), 400
        
    # Check file size (by seeking to end and back)
    file.seek(0, os.SEEK_END)
    size = file.tell()
    file.seek(0)
    if size > MAX_FILE_SIZE:
        return jsonify({"status": "error", "message": "File size exceeds 10MB limit."}), 400

    # In a real app, integrate with SendGrid, SES, etc. here.
    # filename = secure_filename(file.filename)
    
    return jsonify({"status": "success", "message": "Application received successfully."})

CONTACT_RECIPIENTS = {
    "General Enquiry": "hello@anahatone.com",
    "Business Partnership": "partnerships@anahatone.com",
    "Careers": "careers@anahatone.com",
    "Media": "media@anahatone.com",
    "Support": "support@anahatone.com",
    "Other": "hello@anahatone.com"
}

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    # Security: Input validation
    name = request.form.get('name')
    email = request.form.get('email')
    enquiry_type = request.form.get('enquiry_type')
    message = request.form.get('message')
    
    if not all([name, email, enquiry_type, message]):
        return jsonify({"status": "error", "message": "Missing required fields."}), 400
        
    # Automatic routing based on mapping
    recipient = CONTACT_RECIPIENTS.get(enquiry_type, CONTACT_RECIPIENTS["General Enquiry"])
    
    # In future: Send email to 'recipient' here.
    
    return jsonify({"status": "success", "message": "Message sent successfully."})

if __name__ == '__main__':
    app.run(debug=True)
