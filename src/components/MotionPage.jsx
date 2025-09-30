import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 12, filter: 'blur(2px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -12, filter: 'blur(2px)', transition: { duration: 0.2 } },
}

const MotionPage = ({ children, keyId }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={keyId} variants={variants} initial="initial" animate="enter" exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default MotionPage


