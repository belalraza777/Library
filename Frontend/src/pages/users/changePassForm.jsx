import React from 'react'

export default function ChangePassForm({ form, setForm, openForm, setOpenForm, ChangePassword }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await ChangePassword(form) // delegate API logic to parent
    };

    const handleClose = () => {
        setForm({ oldPassword: "", newPassword: "" });
        setOpenForm(false);
    };

    if (!openForm) return null;

     return (
    <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-blue-400 w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <i className="fas fa-times"></i>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <i className="fas fa-lock mr-2 text-indigo-500"></i>
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              placeholder="Enter Old Password"
              className="w-full p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter New Password"
              className="w-full p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            <i className="fas fa-check mr-2"></i> Change
          </button>
        </form>
      </div>
    </div>
  );
}
