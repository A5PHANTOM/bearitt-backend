export const test = async (req, res) => {
    try {
      res.json({
        status: 200,
        message: "OK"
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };