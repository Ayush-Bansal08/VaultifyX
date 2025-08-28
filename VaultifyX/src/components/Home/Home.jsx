import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ShoppingBag, Gem, Lock } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-10 left-20 animate-pulse" />
        <div className="absolute w-80 h-80 bg-blue-600/20 rounded-full blur-3xl bottom-20 right-20 animate-ping" />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl "
      >
        <div className="flex items-center justify-center mb-4">
          <ShieldCheck className="w-14 h-14 text-cyan-400 drop-shadow-lg" />
        </div>
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500  animate-bounce">
          VaultifyX
        </h1>
        <p className="text-gray-300 text-lg mb-10 leading-relaxed ">
          Unlock the future of secure trading. <br /> Buy, sell & protect your digital wealth with confidence.
        </p>
      </motion.div>

      {/* Navigation Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full"
      >
        <NavLink to="/BuyItem">
          <motion.div
            whileHover={{ scale: 1.07, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-cyan-400 transition duration-300 text-center"
          >
            <ShoppingBag className="w-12 h-12 mb-4 text-cyan-300 mx-auto" />
            <h2 className="text-2xl font-semibold mb-2">Buy Assets</h2>
            <p className="text-gray-400 text-sm">
              Browse exclusive marketplace items with military-grade security.
            </p>
          </motion.div>
        </NavLink>

        <NavLink to="/SellItem">
          <motion.div
            whileHover={{ scale: 1.07, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-yellow-400 transition duration-300 text-center"
          >
            <Gem className="w-12 h-12 mb-4 text-yellow-400 mx-auto" />
            <h2 className="text-2xl font-semibold mb-2">Sell Assets</h2>
            <p className="text-gray-400 text-sm">
              List your premium assets & earn securely within VaultifyX.
            </p>
          </motion.div>
        </NavLink>
      </motion.div>

      {/* Extra CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-16 text-center"
      >
        {/* <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-md hover:border-purple-400 transition">
          <Lock className="w-5 h-5 text-purple-400 mr-2" />
          <span className="text-sm text-gray-300">Your vault. Your rules.</span>
        </div> */}
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} VaultifyX. Empowering digital asset security.
      </motion.footer>
    </div>
  );
}

export default Home;
