module K
  jfile = File.read File.expand_path('../../../JFile', __FILE__)
  VERSION = jfile[/^version '([\d\.]+)'$/, 1]
end
