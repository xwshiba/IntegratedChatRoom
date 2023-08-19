# app/helpers/validation_helper.rb

module ValidationHelper
  def self.is_valid_username?(username)
    return false unless username.present?
    username.strip!
    !!username.match(/^[A-Za-z0-9_]{1,20}$/)
  end

  def self.is_valid_message?(text)
    !!text.match(/^[A-Za-z,.' ?!]{1,}$/)
  end
end
