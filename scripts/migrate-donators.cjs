/**
 * Migration Script: Copies existing DONATOR and PRIVATE_DONATOR entries
 * from the 'sponsor' collection into the dedicated 'donator' collection.
 *
 * Usage:
 *   node scripts/migrate-donators.cjs
 */
const path = require('path');
const { initializeApp } = require(path.join(__dirname, '../node_modules/firebase/compat/app'));
require(path.join(__dirname, '../node_modules/firebase/compat/firestore'));

const firebaseConfig = {
  apiKey: "AIzaSyC3xd3d_wSJhjix54ZoA_xhZfUQ3SvFBew",
  authDomain: "hornussergesellschaft-urtenen.firebaseapp.com",
  projectId: "hornussergesellschaft-urtenen",
  storageBucket: "hornussergesellschaft-urtenen.appspot.com",
  messagingSenderId: "202578810427",
  appId: "1:202578810427:web:436c48eba20d833bd1ee1e"
};

const app = initializeApp(firebaseConfig);
const db = app.firestore();

async function migrate() {
  console.log('Starting Donator migration...');
  const sponsorSnap = await db.collection('sponsor').where('type', 'in', ['DONATOR', 'PRIVATE_DONATOR']).get();
  console.log(`Found ${sponsorSnap.size} legacy donators in 'sponsor' collection.`);

  let count = 0;
  for (const doc of sponsorSnap.docs) {
    const data = doc.data();
    const donatorData = {
      name: data.name || '',
      category: data.type === 'PRIVATE_DONATOR' ? 'PRIVATE' : 'COMPANY',
      city: data.city || '',
      url: data.url || '',
      email: data.email || '',
      image: data.image || '',
      order: data.order ?? 10
    };

    // Use same doc ID to avoid duplicates
    await db.collection('donator').doc(doc.id).set(donatorData, { merge: true });
    count++;
    console.log(`  Migrated: [${doc.id}] ${donatorData.name} (${donatorData.category})`);
  }

  console.log(`Migration completed successfully! ${count} donators migrated.`);
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
