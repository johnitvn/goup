FROM mcr.microsoft.com/playwright:jammy

ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    zsh \
    curl \
    nano \
    nmap \
    unzip \
    gnupg \
    software-properties-common \
    apt-transport-https \
    git \
    lsof \
    bc \
    wget \
    iputils-ping \
    fontconfig

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install Docker
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable" \
    && apt-get install -y docker-ce docker-ce-cli containerd.io

# Install pnpm and nx
RUN npm install -g pnpm nx

COPY p10k.zsh .p10k.zsh

# Install Oh My Zsh and Powerlevel10k
RUN curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh - \
    && git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/.oh-my-zsh/custom/themes/powerlevel10k \
    && sed -i 's/ZSH_THEME=".*"/ZSH_THEME="powerlevel10k\/powerlevel10k"/g' ~/.zshrc \
    && echo 'source ~/.oh-my-zsh/custom/themes/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc \
    && mv .p10k.zsh  ~/.p10k.zsh \
    && echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc

# Install grpcurl
RUN curl -fsSL "https://github.com/fullstorydev/grpcurl/releases/download/v1.9.1/grpcurl_1.9.1_linux_x86_64.tar.gz" | tar -xz -C /usr/local/bin

# Set default shell
ENV SHELL /bin/zsh

# Copy entrypoint script and give execution permissions
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY info.sh /usr/bin/info
RUN chmod +x /usr/bin/info && echo "info" >> ~/.zshrc

# Set entrypoint and command
WORKDIR /goup
ENTRYPOINT ["/entrypoint.sh"]
CMD ["tail", "-f", "/dev/null"]
