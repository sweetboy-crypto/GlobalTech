const cron = require('node-cron');
const Package = require('../models/Package');
const StatusHistory = require('../models/StatusHistory');

const startStatusUpdateCron = () => {
  // Schedule a job to run every minute
  cron.schedule('*/1 * * * *', async () => {
    console.log('Running cron job to update package statuses...');
    const now = new Date();

    try {
      // 1. Find packages that should be in transit
      const packagesToTransit = await Package.find({
        current_status: 'NotYetInTransit',
        transit_date: { $lte: now }
      });

      for (const pkg of packagesToTransit) {
        pkg.current_status = 'InTransit';
        await pkg.save();

        const history = new StatusHistory({
          package_id: pkg._id,
          changed_by: null, // Indicates an automated change
          old_status: 'NotYetInTransit',
          new_status: 'InTransit',
          note: 'Package has started its journey based on the scheduled transit time.'
        });
        for (const pkg of packagesToTransit) {
        pkg.current_status = 'InTransit';
        await pkg.save();

        const history = new StatusHistory({
          package_id: pkg._id,
          changed_by: null, // Indicates an automated change
          old_status: 'NotYetInTransit',
          new_status: 'InTransit',
          note: 'Package has started its journey based on the scheduled transit time.'
        });
        await history.save();
        console.log(`Package ${pkg.tracking_code} updated to InTransit.`);
      }

      // 2. Find packages that should be delivered
      const packagesToDeliver = await Package.find({
        current_status: 'InTransit',
        delivery_date: { $lte: now }
      });
        for (const pkg of packagesToDeliver) {
        pkg.current_status = 'Delivered';
        await pkg.save();

        const history = new StatusHistory({
          package_id: pkg._id,
          changed_by: null, // Indicates an automated change
          old_status: 'InTransit',
          new_status: 'Delivered',
          note: 'Package has been delivered based on the scheduled delivery time.'
        });
        await history.save();
        console.log(`Package ${pkg.tracking_code} updated to Delivered.`);
      }

    } catch (error) {
      console.error('Error running status update cron job:', error);
    }
  });
};

module.exports = { startStatusUpdateCron };
