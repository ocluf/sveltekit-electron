// Simple Test Plugin for Pluggable Electron
// This plugin demonstrates basic functionality and helps verify the plugin system

// Export init function that will be called when the plugin is initialized
module.exports = {
    init: function(extensionManager) {
        console.log('Line 6 - index.cjs: Simple Test Plugin initialized');
        
        // Register an extension point for adding menu items
        extensionManager.register(
            'extend-menu',
            'testMenuItem',
            {
                text: 'Test Plugin Menu Item',
                click: () => {
                    console.log('Line 15 - index.cjs: Test menu item clicked');
                }
            }
        );

        // Register an extension point for modifying content
        extensionManager.register(
            'modify-content',
            'testModifier',
            (content) => {
                console.log('Line 25 - index.cjs: Content modified');
                return `${content} (Modified by Simple Test Plugin)`;
            }
        );

        return Promise.resolve();
    }
};
