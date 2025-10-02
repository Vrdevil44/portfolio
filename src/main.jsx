import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
// App is not used after routing migration; kept temporarily for future reuse
import AppShell from './routes/AppShell'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Labs from './pages/Labs'
import Resume from './pages/Resume'
import Store from './pages/Store'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import { ThemeProvider } from './components/SettingsPanel/ThemeSettings/ThemeContext'
import { FontProvider } from './contexts/FontContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FontProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<AppShell />}> 
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="services" element={<Services />} />
              <Route path="blog" element={<Blog />} />
              <Route path="post" element={<Post />} />
              <Route path="labs" element={<Labs />} />
              <Route path="resume" element={<Resume />} />
              <Route path="store" element={<Store />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FontProvider>
    </ThemeProvider>
  </StrictMode>,
)
