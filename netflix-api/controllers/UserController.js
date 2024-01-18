const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => { id === data.id });
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedmovies: [...user.likedmovies, data],
                    },
                    { new: true }
                );
            } else return res.json({ msg: "Movie already added to the liked list." });
        } else await User.create({ email, likedmovies: [data] });
        return res.json({ msg: "Movie added succesfully" });
    } catch (error) {
        return res.json({ msg: "Error adding movie" })
    }
};

module.exports.getLikedMovies = async (req, res) => {
    try {
        
    } catch (err) {
        return res,json({ msg: "Error fetching movie"})
    }
}