# 🎛️ Web Digital Filter Designer

![Python](https://img.shields.io/badge/Backend-Flask-green)
![JavaScript](https://img.shields.io/badge/Frontend-P5.js-yellow)
![Topic](https://img.shields.io/badge/Topic-Digital%20Signal%20Processing-blue)

## 📌 Project Overview
This project is an interactive web-based tool for designing **Digital Filters** using the **Pole-Zero Placement** method. It bridges the gap between complex mathematical concepts (Z-Transform) and intuitive visual design.

Users can interactively add and move **Poles** and **Zeros** on the Z-plane, and the system calculates and plots the **Frequency Response** (Magnitude and Phase) in real-time. The backend is powered by **Python (Flask & SciPy)**, while the interactive visualization is built with **P5.js**.

## ⚙️ Key Features
* **Interactive Z-Plane:** Drag and drop Poles (x) and Zeros (o) to modify the filter characteristics dynamically.
* **Real-time Visualization:** Instantly see the effect of your design on the Magnitude and Phase response graphs.
* **Filter Analysis:**
    * Calculate Transfer Function $H(z)$.
    * Analyze stability based on pole locations (inside/outside unit circle).
* **All-Pass Filters:** Includes a module for designing and analyzing All-Pass filters for phase correction.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (**P5.js** for graphics).
* **Backend:** Python (**Flask** framework).
* **Math/DSP:** NumPy, SciPy (for calculating frequency response).

## 🚀 How to Run
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/mariamashraf731/Web-Digital-Filter-Designer.git](https://github.com/mariamashraf731/Web-Digital-Filter-Designer.git)
    ```
2.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the Server:**
    ```bash
    python app.py
    ```
4.  **Open in Browser:**
    Go to `http://localhost:5000` to start designing filters.

## 📸 Usage
1.  Click on the Unit Circle to add a Zero.
2.  Shift-Click (or toggle mode) to add a Pole.
3.  Drag points to adjust frequency/gain.
4.  Observe the Magnitude/Phase plots updating automatically.