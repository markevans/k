require "k/version"

module K
  if defined? Rails
    class Engine < Rails::Engine
    end
  end
end
