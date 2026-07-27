const fs = require('fs');
const path = require('path');

const jobsDir = path.join(__dirname, 'frontend', 'src', 'jobs');

const categoryMap = {
    'AgricultureJobs.jsx': 'Agriculture',
    'AnganwadiJobs.jsx': 'Anganwadi',
    'BeautyJobs.jsx': 'Beauty',
    'DairyJobs.jsx': 'Dairy',
    'DomesticJobs.jsx': 'Domestic',
    'FoodProcessingJobs.jsx': 'Food Processing',
    'GoatFarmJobs.jsx': 'Goat Farming',
    'HandicraftsJobs.jsx': 'Handicrafts',
    'MushroomJobs.jsx': 'Mushroom',
    'TailoringJobs.jsx': 'Tailoring'
};

for (const [filename, category] of Object.entries(categoryMap)) {
    const filePath = path.join(jobsDir, filename);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Remove if it was accidentally injected incorrectly (it wasn't)
        if (content.includes('DynamicJobList')) {
            console.log(`Skipping ${filename} (already injected)`);
            
            // Actually, since I didn't see it injected in AgricultureJobs, it might not be there at all.
            // Let me force remove any existing DynamicJobList tags just in case
            content = content.replace(/<DynamicJobList[^>]*>/g, '');
        } else {
             // Add import
            content = content.replace(
                "import React",
                "import DynamicJobList from '../components/DynamicJobList';\nimport React"
            );
        }

        // We will inject it right before "{/* View More Button Container */}"
        content = content.replace(
            "{/* View More Button Container */}",
            `<DynamicJobList category="${category}" />\n\n        {/* View More Button Container */}`
        );

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Successfully injected into ${filename}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
}
