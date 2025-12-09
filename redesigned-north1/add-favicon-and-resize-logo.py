import os
import re

# Define the directory
directory = r"c:\Users\MSI-PC\Documents\GitHub\North\redesigned-north1"

# List of all HTML files to update
files_to_update = [
    "index.html",
    "index2.html",
    "about.html",
    "windows-doors.html",
    "conservatories.html",
    "roofline.html",
    "extensions.html",
    "home-improvements.html",
    "contact.html"
]

# Favicon links to add (comprehensive set for all browsers and devices)
favicon_links = '''    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/site.webmanifest">
    <link rel="shortcut icon" href="favicon/favicon.ico">
    <meta name="theme-color" content="#1A4A5E">'''

for filename in files_to_update:
    filepath = os.path.join(directory, filename)

    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()

        # Check if favicon is already added
        if 'favicon/favicon' not in content:
            # Find the title tag and add favicon links after it
            pattern = r'(    <title>.*?</title>)'
            replacement = r'\1\n' + favicon_links
            content = re.sub(pattern, replacement, content)

        # Write the updated content back
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)

        print(f"[OK] Updated {filename} with favicon")
    else:
        print(f"[ERROR] File not found: {filename}")

print("\n[SUCCESS] All pages updated with favicon!")