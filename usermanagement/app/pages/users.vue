<script setup>
import Default from '~/layouts/default.vue';

const response = await $fetch('/api/users')
const users = response.users

const generatePDF = async () => {
    try {
        const jsPDF = (await import('jspdf')).default;
        
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text('User Management Report', 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
        
        let yPosition = 60;
        const columnWidths = [50, 70, 80]; 
        const startX = 20;
        const pageWidth = doc.internal.pageSize.width;
        
        const truncateText = (text, maxWidth) => {
            const textWidth = doc.getTextWidth(text);
            if (textWidth <= maxWidth) return text;
            
            let truncated = text;
            while (doc.getTextWidth(truncated + '...') > maxWidth && truncated.length > 0) {
                truncated = truncated.slice(0, -1);
            }
            return truncated + '...';
        };
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Username', startX, yPosition);
        doc.text('Email', startX + columnWidths[0], yPosition);
        doc.text('Password', startX + columnWidths[0] + columnWidths[1], yPosition);
        
        // Header underline
        yPosition += 5;
        doc.line(startX, yPosition, startX + columnWidths[0] + columnWidths[1] + columnWidths[2], yPosition);
        
        // Table data
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        yPosition += 10;
        
        users.forEach((user, index) => {
            if (yPosition > 270) { 
                doc.addPage();
                yPosition = 20;
            }
            
            const username = truncateText(user.username || '', columnWidths[0] - 5);
            const email = truncateText(user.email || '', columnWidths[1] - 5);
            const password = truncateText(user.password || '', columnWidths[2] - 5);
            
            doc.text(username, startX, yPosition);
            doc.text(email, startX + columnWidths[0], yPosition);
            doc.text(password, startX + columnWidths[0] + columnWidths[1], yPosition);
            yPosition += 15;
        });
        
        doc.save(`user-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
};

</script>
<template>
    <Default>
    <div>
        <div class="relative overflow-x-auto">
            <button @click="generatePDF" class="bg-[#007AFF] w-fit mb-10 rounded-lg p-2 text-white font-semibold hover:opacity-95  disabled:opacity-50" >
                Generate Report
            </button>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Password
                    </th>

                </tr>
            </thead>
            <tbody v-for="user in users">
                
                <tr class="bg-white border-b  border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{user.username}}
                    </th>
                    <td class="px-6 py-4">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.password }}
                    </td>

                </tr>
                <!-- <tr class="bg-white border-b  border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">
                        White
                    </td>
                    <td class="px-6 py-4">
                        Laptop PC
                    </td>

                </tr>
                <tr class="bg-white ">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">
                        Black
                    </td>
                    <td class="px-6 py-4">
                        Accessories
                    </td>

                </tr> -->
            </tbody>
        </table>
    </div>
</div>
</Default>


</template>