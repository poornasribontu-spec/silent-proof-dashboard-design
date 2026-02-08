# SilentProof – Classroom Exam Integrity Dashboard

SilentProof is a project built to explore how **offline exam malpractice** can be monitored in a **privacy-friendly way**.  
Instead of focusing on individual students, the classroom is divided into **equal partitions**, and a **risk score** is calculated for each partition based on environmental audio activity.

The system is meant to **assist invigilators**, not replace them or accuse students.

---

## 🔍 Problem Statement
In offline examinations, invigilators often have to monitor large classrooms with limited visibility and time.  
Most existing solutions either depend on **manual supervision** or **camera-based monitoring**, which can be intrusive and raise privacy concerns.

There is a need for a system that can **support invigilators** without tracking or identifying individual students.

---

## 💡 Our Idea
SilentProof works by dividing a classroom into **grid-based partitions**.  
Each partition represents a zone instead of a specific student.

- The classroom layout can be customized
- Each zone is associated with a microphone
- Audio activity in each zone is analyzed
- A **risk score from 0 to 10** is generated
- Higher scores indicate unusual activity such as whispering or paper movement sounds

This helps invigilators focus attention on **zones** rather than people.

---

## ✨ Features
- Privacy-focused design (no cameras used)
- Classroom represented as grid partitions
- Zone-wise risk score visualization
- Custom classroom setup (rows, columns, partitions)
- Demo mode for simulation
- Clean and responsive dashboard UI

---

## 🧪 Demo & Custom Modes
- **Demo Mode**: Simulated data to demonstrate how the system works
- **Custom Classroom Mode**: Allows users to define classroom size and partition count

---

## 🛠 Tech Stack Used
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Git & GitHub**

---

## ⚠️ Disclaimer
SilentProof is only a **decision-support tool**.  
It does not identify students or make accusations.  
Final decisions are always made by the invigilator.

---

## 🚀 Future Scope
- Integration with real microphones
- Machine learning-based audio classification
- Historical analytics and reports
- Deployment for institutional use

---

## 👩‍💻 Author
**Poornasri Bontu**  
CSE Undergraduate | Hackathon Project  

---

⭐ Feel free to star the repository if you find this project useful or interesting.
