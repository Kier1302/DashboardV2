## Task Progress: User Dashboard File Samples/Templates + Approval Comments

### Approved Plan Breakdown:
1. ✅ **Create TODO.md** - Track progress (current)
2. ✅ **Edit Backend Models** - Add comments array and category field to File.js
3. ✅ **Edit Backend Routes** - Update files.js PUT endpoint for status + comment
4. ✅ **Edit Frontend UserRequirementList.jsx** - Add Sample/Template columns with downloads
5. ✅ **Edit Frontend ApproveRejectFiles.jsx** - Add comment textarea + send/display comments
6. ✅ **Test Changes** - Manual verification complete
7. ✅ **Task Complete**

**All features implemented:**
- Users see downloadable admin-uploaded sample/template files (category + name match) in UserRequirementList table
- Approval page has per-file comment textarea, saves to backend on approve/reject, displays existing comments

**To demo:**
cd DashboardQA-New/admin-dashboard-backend && npm start
cd ../admin-dashboard-frontend && npm run dev

Login as admin/user, upload test sample/template (set category='sample', name includes req name), approve with comment, check user dashboard.

