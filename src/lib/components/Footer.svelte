<script>
    const currentYear = new Date().getFullYear();
</script>

<footer class="py-8 px-4 border-t border-gray-200 mt-24">
    <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div class="mb-6 md:mb-0">
                <div class="text-2xl font-bold mb-2">G<span class="text-red-500">.</span></div>
                <p class="text-gray-600">Web Developer & Designer</p>
            </div>
            
            <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                <a href="/" class="hover:text-red-500 transition-colors">Home</a>
                <a href="/projects" class="hover:text-red-500 transition-colors">Projects</a>
                <a href="/photography" class="hover:text-red-500 transition-colors">Photography</a>
                <a href="/about" class="hover:text-red-500 transition-colors">About</a>
                <a href="mailto:hello@godwinjemegah.com" class="hover:text-red-500 transition-colors">Contact</a>
                <a href="https://github.com/godwinjemegah" target="_blank" rel="noopener noreferrer" class="hover:text-red-500 transition-colors">GitHub</a>
            </div>
        </div>
        
        <div class="mt-8 text-center text-gray-500 text-sm">
            © {currentYear} Godwin Jemegah. All rights reserved.
        </div>
    </div>
</footer>